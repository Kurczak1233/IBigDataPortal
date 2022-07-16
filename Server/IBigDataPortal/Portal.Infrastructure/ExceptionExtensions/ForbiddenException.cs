namespace IBigDataPortal.Infrastructure.ExceptionExtensions;

public class ForbiddenException : Exception
{
    public ForbiddenException() : base("You are not authorized to perform this action")
    {
    }
}