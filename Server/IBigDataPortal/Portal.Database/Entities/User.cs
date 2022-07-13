namespace IBigDataPortal.Database.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } 
    public string Nickname { get; set; }
    
    public UserRole? UserRole { get; set; }
    public int UserRoleId { get; set; }
}