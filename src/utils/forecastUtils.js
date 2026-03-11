/**
 * AI FORECASTING UTILITIES
 * Linear Regression + Exponential Smoothing + Hybrid Models
 */

export const linearRegressionForecast = (
  historicalValues,
  yearsToForecast = 7,
) => {
  const n = historicalValues.length;
  const xValues = Array.from({ length: n }, (_, i) => i);

  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = historicalValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * historicalValues[i], 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const yMean = sumY / n;
  const ssTotal = historicalValues.reduce(
    (sum, y) => sum + Math.pow(y - yMean, 2),
    0,
  );
  const ssResidual = historicalValues.reduce((sum, y, i) => {
    const predicted = slope * i + intercept;
    return sum + Math.pow(y - predicted, 2);
  }, 0);
  const rSquared = 1 - ssResidual / ssTotal;

  const standardError = Math.sqrt(ssResidual / (n - 2));

  const forecast = [];
  for (let i = 0; i < yearsToForecast; i++) {
    const futureX = n + i;
    const predictedValue = slope * futureX + intercept;
    const margin =
      2 *
      standardError *
      Math.sqrt(1 + 1 / n + Math.pow(futureX - sumX / n, 2) / sumX2);

    forecast.push({
      year: 2024 + i,
      value: Math.max(0, predictedValue),
      upperBound: Math.max(0, predictedValue + margin),
      lowerBound: Math.max(0, predictedValue - margin),
      confidence: Math.max(0.5, Math.min(0.99, rSquared - i * 0.05)),
    });
  }

  return {
    forecast,
    trendInfo: {
      slope,
      intercept,
      rSquared,
      trend: slope > 0 ? "increasing" : slope < 0 ? "decreasing" : "stable",
      reliability:
        rSquared > 0.8 ? "high" : rSquared > 0.5 ? "moderate" : "low",
    },
  };
};

export const exponentialSmoothingForecast = (
  historicalValues,
  alpha = 0.3,
  yearsToForecast = 7,
) => {
  const n = historicalValues.length;

  let smoothedValues = [historicalValues[0]];
  for (let i = 1; i < n; i++) {
    const smoothed =
      alpha * historicalValues[i] + (1 - alpha) * smoothedValues[i - 1];
    smoothedValues.push(smoothed);
  }

  const recentData = smoothedValues.slice(-10);
  const recentTrend =
    (recentData[recentData.length - 1] - recentData[0]) / recentData.length;

  const forecast = [];
  let lastValue = smoothedValues[n - 1];

  for (let i = 0; i < yearsToForecast; i++) {
    const predictedValue = lastValue + recentTrend * (i + 1);
    const uncertainty = Math.abs(recentTrend) * 0.1 * (i + 1);

    forecast.push({
      year: 2024 + i,
      value: Math.max(0, predictedValue),
      upperBound: Math.max(0, predictedValue + uncertainty),
      lowerBound: Math.max(0, predictedValue - uncertainty),
      confidence: Math.max(0.6, 0.9 - i * 0.05),
    });

    lastValue = predictedValue;
  }

  return {
    forecast,
    trendInfo: {
      recentTrend,
      trend:
        recentTrend > 0
          ? "increasing"
          : recentTrend < 0
            ? "decreasing"
            : "stable",
    },
  };
};

export const hybridForecast = (historicalValues, yearsToForecast = 7) => {
  const linearResult = linearRegressionForecast(
    historicalValues,
    yearsToForecast,
  );
  const exponentialResult = exponentialSmoothingForecast(
    historicalValues,
    0.3,
    yearsToForecast,
  );

  const hybridForecast = linearResult.forecast.map((linear, i) => {
    const exponential = exponentialResult.forecast[i];

    return {
      year: linear.year,
      value: linear.value * 0.6 + exponential.value * 0.4,
      upperBound: linear.upperBound * 0.6 + exponential.upperBound * 0.4,
      lowerBound: linear.lowerBound * 0.6 + exponential.lowerBound * 0.4,
      confidence: (linear.confidence + exponential.confidence) / 2,
    };
  });

  return {
    forecast: hybridForecast,
    trendInfo: linearResult.trendInfo,
  };
};

export const detectAnomalies = (values) => {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  const stdDev = Math.sqrt(variance);

  return values
    .map((val, i) => {
      const zScore = (val - mean) / stdDev;
      return {
        index: i,
        value: val,
        isAnomaly: Math.abs(zScore) > 2,
        severity: Math.abs(zScore),
        type: zScore > 2 ? "spike" : zScore < -2 ? "drop" : "normal",
      };
    })
    .filter((item) => item.isAnomaly);
};

export const calculateGrowthRate = (values) => {
  const growthRates = [];

  for (let i = 1; i < values.length; i++) {
    const growth = ((values[i] - values[i - 1]) / values[i - 1]) * 100;
    growthRates.push(growth);
  }

  const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

  return {
    rates: growthRates,
    average: avgGrowth,
    trend: avgGrowth > 0 ? "growth" : avgGrowth < 0 ? "decline" : "stable",
  };
};

export const generateForecastInsights = (
  historicalValues,
  forecastData,
  indicator,
) => {
  const insights = [];
  const { forecast, trendInfo } = forecastData;

  const trendDirection =
    trendInfo.trend === "increasing"
      ? "upward"
      : trendInfo.trend === "decreasing"
        ? "downward"
        : "stable";

  insights.push({
    type: "trend",
    title: `${indicator} Trajectory`,
    message: `AI detects a ${trendDirection} trend with ${trendInfo.reliability} reliability (R² = ${trendInfo.rSquared?.toFixed(2) || "N/A"}).`,
    icon:
      trendInfo.trend === "increasing"
        ? "📈"
        : trendInfo.trend === "decreasing"
          ? "📉"
          : "➡️",
  });

  const currentValue = historicalValues[historicalValues.length - 1];
  const future2030 = forecast[forecast.length - 1].value;
  const percentChange = (
    ((future2030 - currentValue) / currentValue) *
    100
  ).toFixed(1);

  insights.push({
    type: "prediction",
    title: "2030 Forecast",
    message: `${indicator} projected to ${percentChange > 0 ? "increase" : "decrease"} by ${Math.abs(percentChange)}% by 2030, reaching ${future2030.toFixed(2)}.`,
    icon: "🔮",
  });

  const avgConfidence =
    forecast.reduce((sum, f) => sum + f.confidence, 0) / forecast.length;
  if (avgConfidence < 0.7) {
    insights.push({
      type: "warning",
      title: "Uncertainty Notice",
      message: `Forecast confidence is ${(avgConfidence * 100).toFixed(0)}%. Consider multiple scenarios when planning.`,
      icon: "⚠️",
    });
  }

  return insights;
};
