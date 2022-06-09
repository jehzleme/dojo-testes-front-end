namespace WebApi.Infra;

public sealed class Todo
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public bool IsComplete { get; private set; }

    public Todo(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
        IsComplete = false;
    }

    public void ToggleStatus() => IsComplete = !IsComplete;
    public void ChangeName(string newName) => Name = newName;
}
