const cron = require("node-cron");
const scraper = require("./scraper");
const notify = require("./notify");

// Planifier l'exécution du script toutes les 24 heures
cron.schedule("0 0 * * *", async () => {
    console.log("Démarrage du scraping...");
    try {
        const crowdfundingProjects = await scraper.scrapeCategory(
            "crowdfunding",
        );
        const upcomingProjects = await scraper.scrapeCategory("upcoming");
        if (crowdfundingProjects.length > 0) {
            await notify.sendNotifications(
                crowdfundingProjects,
                "Projets en crowdfunding",
            );
        }
        if (upcomingProjects.length > 0) {
            await notify.sendNotifications(upcomingProjects, "Projets à venir");
        }
    } catch (error) {
        console.error(
            "Erreur lors de l'exécution planifiée du scraping :",
            error,
        );
    }
    console.log("Scraping terminé.");
});

// Lancer le script une première fois
(async () => {
    console.log("Lancement initial du scraping...");
    try {
        const crowdfundingProjects = await scraper.scrapeCategory(
            "crowdfunding",
        );
        const upcomingProjects = await scraper.scrapeCategory("upcoming");
        if (crowdfundingProjects.length > 0) {
            await notify.sendNotifications(
                crowdfundingProjects,
                "Projets en crowdfunding",
            );
        }
        if (upcomingProjects.length > 0) {
            await notify.sendNotifications(upcomingProjects, "Projets à venir");
        }
    } catch (error) {
        console.error("Erreur lors du lancement initial du scraping :", error);
    }
})();
