using IBigDataPortal.Database.Entities;

namespace IBigDataPortal.Database;

public static class DbSchemas
{
    public const string Dbo = "dbo";
}

public static class Dbo
{
    private static readonly string _schema = DbSchemas.Dbo;
    public static string Users { get; } = $"[{_schema}].[{nameof(Users)}]";
    public static string FilesMetadata { get; } = $"[{_schema}].[{nameof(FilesMetadata)}]";
    public static string Posts { get; } = $"[{_schema}].[{nameof(Posts)}]";
    public static string JobOffers { get; } = $"[{_schema}].[{nameof(JobOffers)}]";
    public static string EduLinks { get; } = $"[{_schema}].[{nameof(EduLinks)}]";
    public static string UserRole { get; } = $"[{_schema}].[{nameof(UserRole)}]";
    public static string Comments { get; } = $"[{_schema}].[{nameof(Comments)}]";
    public static string Cooperations { get; } = $"[{_schema}].[{nameof(Cooperations)}]";
  
}