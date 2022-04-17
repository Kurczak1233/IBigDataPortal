FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
WORKDIR /app
EXPOSE 5000

ARG ASPNETCORE_ENVIRONMENT

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=$ASPNETCORE_ENVIRONMENT

FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src
COPY ["portal/Server/IBigDataPortal/", ".portal/Server/IBigDataPortal/"]
RUN dotnet restore "portal/Server/IBigDataPortal/Portal.csproj"

# COPY ["Core/", "./Core/"]
# COPY ["Mobile/modules/", "./Mobile/modules/"]
# COPY ["Server/Database/", "./Server/Database/"]

WORKDIR /src
RUN dotnet build "Server/IBigDataPortal/Portal.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Server/IBigDataPortal/Portal.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Portal.dll"]