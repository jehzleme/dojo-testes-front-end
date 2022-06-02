using Microsoft.EntityFrameworkCore;

namespace WebApi.Infra;

public class TodoDatabaseContext : DbContext
{
    public DbSet<Todo> Todos => Set<Todo>();

    public TodoDatabaseContext(DbContextOptions<TodoDatabaseContext> options)
        : base(options) { }
}
