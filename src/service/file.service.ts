import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemoryStoredFile } from 'nestjs-form-data';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';
import { FileServerResponseDto } from '@/service/file.dto';
import { escape } from 'querystring';

@Injectable()
export class FileService {
  private readonly httpService: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.httpService = axios.create({
      baseURL: configService.get<string>('FILE_SERVER_URL'),
    });
  }

  public async upload(file: MemoryStoredFile, token: string): Promise<string> {
    Logger.log('FileService::upload');
    Logger.debug(
      JSON.stringify({
        fileName: file.originalName,
        ext: file.mimetype,
        size: file.size,
      }),
    );

    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: `${file.originalName}`,
    });

    return this.httpService
      .post<FileServerResponseDto>(`/uploadFile`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data.fileName);
  }

  public async delete(fileName: string, token: string) {
    Logger.log('FileService::delete', { fileName: escape(fileName), token });

    return this.httpService
      .delete<FileServerResponseDto>(`/deleteFile/${escape(fileName)}`, {
        headers: {
          Authorization: token.substring(7, token.length),
        },
      })
      .then((res) => res.data.fileName);
  }
}
