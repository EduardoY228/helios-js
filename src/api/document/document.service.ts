import { Inject, Injectable, Logger } from '@nestjs/common';
import { DocumentRepository } from '@/api/document/document.repository';
import { MemoryStoredFile } from 'nestjs-form-data';
import { FileService } from '@/service/file.service';
import { Document } from '@/api/document/document.entity';
import { DocumentType } from '@/api/document/document-type.enum';

@Injectable()
export class DocumentService {
  @Inject(DocumentRepository)
  private readonly documentRepository: DocumentRepository;
  @Inject(FileService)
  private readonly fileService: FileService;

  public async create(
    {
      documentType,
      file,
      plantId,
    }: {
      readonly documentType: string;
      readonly file: MemoryStoredFile;
      readonly plantId?: number;
    },
    token: string,
  ): Promise<Document> {
    return this.documentRepository.save({
      url: await this.fileService.upload(file, token),
      documentType: DocumentType[documentType] ?? DocumentType.OTHER,
      name: file.originalName,
    });
  }

  public async createMany(
    documentsToCreate: {
      readonly documentType: string;
      readonly file: MemoryStoredFile;
      readonly plantId?: number;
    }[],
    token: string,
  ) {
    return Promise.all(documentsToCreate.map((doc) => this.create(doc, token)));
  }

  public async getAll() {
    return this.documentRepository.find({
      relations: {
        plant: true,
      },
    });
  }

  public async deleteById(id: number, token: string) {
    try {
      const document = await this.documentRepository.findOne({ where: { id } });

      if (
        await this.documentRepository
          .count({ where: { name: document.name } })
          .then((count) => count === 1)
      ) {
        const resFileServer = await this.fileService.delete(
          document.name,
          token,
        );

        Logger.log('DocumentService::deleteById FileService::delete', {
          deleteFileName: resFileServer,
        });
      }

      return this.documentRepository.delete(id);
    } catch (e) {
      Logger.error('Error in DocumentService::deleteById', { ...e });

      throw e;
    }
  }

  public async isPresent(id: number): Promise<boolean> {
    return this.documentRepository
      .count({ where: { id } })
      .then((count) => count === 1);
  }
}
