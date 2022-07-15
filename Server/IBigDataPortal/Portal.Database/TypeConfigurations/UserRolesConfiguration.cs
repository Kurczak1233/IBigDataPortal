using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IBigDataPortal.Database.TypeConfigurations;

public class UserRolesConfiguration : IEntityTypeConfiguration<Entities.UserRole>
{
    public void Configure(EntityTypeBuilder<Entities.UserRole> builder)
    {
        builder.HasData(
            new Entities.UserRole()
            {
                Id = 1,
                RoleName = "Admin"
            },
            new Entities.UserRole()
            {
                Id = 2,
                RoleName = "HEI"
            },
            new Entities.UserRole()
            {
                Id = 3,
                RoleName = "Employee"
            },
            new Entities.UserRole()
            {
                Id = 4,
                RoleName = "Student/Business"
            });
    }
}