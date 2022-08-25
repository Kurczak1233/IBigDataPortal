using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace IBigDataPortal.Database;

public class ApplicationDbContext : DbContext
{
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Post> Posts { get; set; }
    public virtual DbSet<JobOffer> JobOffers { get; set; }
    public virtual DbSet<EduLink> EduLinks { get; set; }
    public virtual DbSet<FileMetadata> FilesMetadata { get; set; }
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<Entities.UserRole> UserRole { get; set; }
    public virtual DbSet<Cooperation> Cooperations { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}