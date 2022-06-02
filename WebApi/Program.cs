using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Commands;
using WebApi.Infra;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<WeatherService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TodoDatabaseContext>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => Results.Redirect("/swagger"));
app.MapGet("/weather-forecast", ([FromQuery] string? term, WeatherService service) => service.Filter(term));

app.MapGet("/todo-items", async ([FromServices] TodoDatabaseContext context, [FromQuery] bool isComplete) =>
{
    return await context.Todos.Where(t => t.IsComplete == isComplete).ToListAsync();
});

app.MapGet("/todo-items/{id}", async (Guid id, [FromServices] TodoDatabaseContext context) =>
{
    if (await context.Todos.FindAsync(id) is Todo todo)
    {
        return Results.Ok(todo);
    } 
    return Results.NotFound();
});

app.MapPost("/todo-items", async (CreateTodoCommand createTodoCommand, [FromServices] TodoDatabaseContext context) =>
{
    var todo = new Todo(createTodoCommand.Name);
    context.Todos.Add(todo);
    await context.SaveChangesAsync();

    return Results.Created($"/todo-items/{todo.Id}", todo);
});

app.MapPut("/todo-items/{id}", async (Guid id, [FromBody] UpdateTodoCommand updateTodoCommand, [FromServices] TodoDatabaseContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.ChangeName(updateTodoCommand.Name);
    await context.SaveChangesAsync();

    return Results.NoContent();
});

app.MapPost("/todo-items/{id}:toggle", async (Guid id, [FromServices] TodoDatabaseContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.ToggleStatus();
    await context.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/todo-items/{id}", async (Guid id, [FromServices] TodoDatabaseContext context) =>
{
    if (await context.Todos.FindAsync(id) is Todo todo)
    {
        context.Todos.Remove(todo);
        await context.SaveChangesAsync();
        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.Run();

