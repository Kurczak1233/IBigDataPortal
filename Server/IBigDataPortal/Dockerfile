# FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
# WORKDIR /app
# EXPOSE 5000

# ENV ASPNETCORE_URLS=http://+:5000

# FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
# WORKDIR /src
# COPY ["IBigDataPortal", ".IBigDataPortal/"]
# RUN dotnet restore "Portal/Portal.csproj"

# RUN dotnet build "IBigDataPortal/Portal/Portal.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "IBigDataPortal/Portal/Portal.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "Portal.dll"]

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]