namespace IBigDataPortal.Domain.UsersAggregate;

public class ApplicationUser
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Nickname { get; set; }
    public int UserRoleId { get; set; }
}