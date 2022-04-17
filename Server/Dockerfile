FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src
COPY ["IBigDataPortal", ".IBigDataPortal/"]
RUN dotnet restore "IBigDataPortal/Portal/Portal.csproj"

RUN dotnet build "IBigDataPortal/Portal/Portal.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IBigDataPortal/Portal/Portal.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Portal.dll"]