const config = require("../config/config.json");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const path = require("path");

const scrapeProjectsByCategory = async (categoryUrl) => {
    let browser;
    try {
        console.log(
            `Ouverture du navigateur pour la catégorie : ${categoryUrl}`,
        );
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        console.log(`Navigation vers l'URL : ${categoryUrl}`);
        await page.goto(categoryUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        });

        console.log("Page chargée, récupération du contenu...");
        const content = await page.content();

        const $ = cheerio.load(content);
        const projects = [];

        console.log("Extraction des projets...");
        $(".gfu-flip-card").each((index, element) => {
            const title = $(element).find("a[title]").attr("title").trim();
            const summary = $(element)
                .find(".gfu-project-card__stamp")
                .text()
                .trim();
            const imageUrl = $(element).find("img").attr("src");
            const link = $(element).find("a").attr("href");

            projects.push({
                title,
                summary,
                image: imageUrl,
                link: `https://gamefound.com${link}`,
            });
        });

        console.log(
            `Extraction terminée, ${projects.length} projets trouvés pour ${categoryUrl}`,
        );
        return projects;
    } catch (error) {
        console.error(
            `Erreur lors du scraping de la catégorie ${categoryUrl}:`,
            error,
        );
        return []; // Retourne une liste vide si une erreur survient
    } finally {
        if (browser) {
            console.log("Fermeture du navigateur...");
            await browser.close();
        }
    }
};

const scrapeCategory = async (categoryKey) => {
    const url = config.baseUrls[categoryKey];
    const projects = await scrapeProjectsByCategory(url);
    const dataPath = path.join(
        __dirname,
        `../data/${categoryKey}_projects.json`,
    );
    try {
        await fs.writeJson(dataPath, projects);
        console.log(`Données de scraping enregistrées dans ${dataPath}`);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des données :", error);
    }
    return projects;
};

module.exports = { scrapeProjectsByCategory, scrapeCategory };
