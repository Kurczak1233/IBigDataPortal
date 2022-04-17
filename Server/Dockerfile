FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
WORKDIR /Server
EXPOSE 5000

ARG ASPNETCORE_ENVIRONMENT

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=$ASPNETCORE_ENVIRONMENT

FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src
COPY ["IBigDataPortal/Portal", ".IBigDataPortal/Portal"]
RUN dotnet restore "IBigDataPortal/Portal.csproj"

# COPY ["Core/", "./Core/"]
# COPY ["Mobile/modules/", "./Mobile/modules/"]
# COPY ["Server/Database/", "./Server/Database/"]

WORKDIR /src
RUN dotnet build "IBigDataPortal/Portal/Portal.csproj" -c Release -o /Server/build

FROM build AS publish
RUN dotnet publish "IBigDataPortal/Portal/Portal.csproj" -c Release -o /Server/publish

FROM base AS final
WORKDIR /Server
COPY --from=publish /Server/publish .
ENTRYPOINT ["dotnet", "Portal.dll"]