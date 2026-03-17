export async function dashboardHandler(req: any, res: any) {
  // fake data (replace with MySQL later)
  res.json({
    productivityScore: 87,
    learningHours: 5,
    problemsSolved: 12,
    careerProgress: 76,
    distractionTime: 1.5,
    fitnessScore: 82,
    internshipReady: 70,
  });
}

export async function notificationsHandler(req: any, res: any) {
  res.json([
    { message: "Keep coding daily 🚀" },
    { message: "You improved your productivity!" },
  ]);
}