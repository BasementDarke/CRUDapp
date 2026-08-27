FROM node:22 AS angular-build

WORKDIR /src/angular

COPY crud-app/package*.json ./

RUN npm ci

COPY crud-app ./

RUN npm run build


FROM mcr.microsoft.com/dotnet/sdk:9.0 AS dotnet-build

WORKDIR /src

COPY BookQuote.sln ./

COPY BookQuote.Api/BookQuote.Api.csproj BookQuote.Api/
COPY BookQuote.Data/BookQuote.Data.csproj BookQuote.Data/

RUN dotnet restore BookQuote.Api/BookQuote.Api.csproj

COPY BookQuote.Api/ BookQuote.Api/
COPY BookQuote.Data/ BookQuote.Data/

RUN dotnet publish BookQuote.Api/BookQuote.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=dotnet-build /app/publish .

COPY --from=angular-build /src/angular/dist/crud-app/browser ./wwwroot

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "BookQuote.Api.dll"]
