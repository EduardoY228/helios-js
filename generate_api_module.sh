#!/bin/zsh

foreach i (
  plant
  user
  employee
  refresh-token
  model-file
  calendar-event
  document
  source-point
  position
  page
  model-30917
  model-30818
  model-30817
  )
  nest g mo api/$i && nest g co api/$i --no-spec && nest g s api/$i --no-spec

  touch src/api/$i/$i.entity.ts
  touch src/api/$i/$i.dto.ts
end
