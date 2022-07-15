namespace IBigDataPortal.Database.Entities;

public class UserRole : BaseEntity
{
    public string RoleName { get; set; } = "";
    public ICollection<User> Users { get; set; }
}