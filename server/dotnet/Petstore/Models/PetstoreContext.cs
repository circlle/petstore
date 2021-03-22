using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Petstore;
using Petstore.Models;

#nullable disable

namespace Petstore.Models
{
    public partial class PetstoreContext : DbContext
    {
        //public PetstoreContext()
        //{
        //}

        public PetstoreContext(DbContextOptions<PetstoreContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=111.229.206.234;database=petstore;user=root;password=dora1234;treattinyasboolean=true", Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.33-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<Petstore.Models.User> User { get; set; }
    }
}
