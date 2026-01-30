# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview.1 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy remaining files and build
COPY . ./
RUN dotnet publish -c Release -o out

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview.1 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Use non-root user for security
USER 1000

# Expose port and start app
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]
