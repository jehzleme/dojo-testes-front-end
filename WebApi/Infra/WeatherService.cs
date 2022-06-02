using System.Collections.Immutable;

namespace WebApi.Infra;

public record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public sealed class WeatherService
{
    private static readonly string[] Summaries =
    {
        "Freezing",
        "Bracing",
        "Chilly",
        "Cool",
        "Mild",
        "Warm",
        "Balmy",
        "Hot",
        "Sweltering",
        "Scorching"
    };

    public ImmutableArray<WeatherForecast> ForeCast { get; private set; }

    public WeatherService()
    {
        ForeCast = Enumerable.Range(1, 25).Select(index =>
            new WeatherForecast
            (
                Date: DateTime.Now.AddDays(index),
                TemperatureC: Random.Shared.Next(-20, 55),
                Summary: Summaries[Random.Shared.Next(Summaries.Length)]
            ))
            .ToImmutableArray();
    }

    public IEnumerable<WeatherForecast> Filter(string? term)
    {
        if (string.IsNullOrEmpty(term))
        {
            return ForeCast;
        }
            
        return ForeCast
            .Where(x => x.Summary.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                        x.TemperatureC.ToString().Contains(term) ||
                        x.Date.ToString().Contains(term))
            .ToList();
    }
}
