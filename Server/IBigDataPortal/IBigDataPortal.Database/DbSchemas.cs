namespace IBigDataPortal.Database;

public static class DbSchemas
{
    public const string Dbo = "dbo";
}

public static class Dbo
{
    private static readonly string _schema = DbSchemas.Dbo;
    public static string Users { get; } = $"[{_schema}].[{nameof(Users)}]";
  
}