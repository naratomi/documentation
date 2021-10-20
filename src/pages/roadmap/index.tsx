import React from "react";
import Layout from "../../theme/Layout";
import "./roadmap.css";

type Item = { name: string; description: string[] | string; done?: boolean };
type PeriodData = {
  active?: boolean;
  future?: boolean;
  items: Item[];
};

const roadmapData = {
  "2022/Q1-Q4": {
    future: true,
    items: [
      {
        name: "Design tools integrations",
        description: `With Tolgee, developers and translators can translate apps very easily. We 
would also like to provide translators with simplicity by enabling them to 
translate texts directly in tools like <b>Figma, XD, or Miro</b>.`,
      },
      {
        name: "Support for mobile apps",
        description: `Tolgee works great with Web apps, and we would like to provide the same 
comfort to mobile developers.`,
      },
      {
        name: "QA Checks",
        description: `Even translators make mistakes, but some of these mistakes can be detected, 
and translators can be notified. No more mistakes like missing tags, missing 
parameters, or missing punctuation marks.`,
      },
      {
        name: "Git integrations",
        description: [
          `There are times when it would be great if localization data were synced with 
your Git repository. Or maybe you would like to create pull requests 
automatically when translations are changed...`,
          `To do this, integrations to <b>GitHub, GitLab</b>, or just support for Git itself will be 
helpful.`,
        ],
      },
      {
        name: "Branching",
        description: `Sometimes you need to maintain multiple versions of your software, so you’ll 
need to have multiple versions of your localization data stored in Tolgee as 
well.`,
      },
      {
        name: "Translator Marketplace",
        description: `Looking for a translator to access foreign markets? Tolgee will help you with 
this. With the Tolgee Translator Marketplace, there will be nothing easier 
than finding the ideal translator for your app.`,
      },
    ],
  },
  "2021/Q4": {
    active: true,
    items: [
      {
        name: "Glossaries",
        description: `To translate the same terms the same way every time, you need to store the 
terminology to reuse it in the future. Glossaries are the feature that enables 
you to do that.`,
      },
      {
        name: "Translation memory",
        description: `Translation memory will suggest sentences that will have already been 
translated in your projects before.`,
      },

      {
        name: "Automated translations",
        description: `Don't translate everything manually. With an automated translations feature, 
services like DeepL, Google Translate, or AWS translate will help you to 
translate your strings automatically.`,
      },
      {
        name: "Paywall for Tolgee Cloud",
        description: `To generate some profit from providing this great localization tool, we need to
enable our users to pay for our services. To do so, we have to implement 
backend services and UI to bill for our services.`,
      },
    ],
  },
  "2021/Q3": {
    items: [
      {
        name: "V1 Release",
        description: `After a year and a half of development, we’ve decided to finally release the 
first official and stable version of Tolgee. Tolgee is now tested and stable, so 
it's time to celebrate. 🎉🎉🎉`,
        done: true,
      },
      {
        name: "Start to promote Tolgee",
        description: `Until now, we have been working hard to come up with a product that will 
satisfy most of the needs of our users. Since Tolgee is now production-ready, 
and we are going to promote it hard!`,
        done: true,
      },
      {
        name: "Clean and improve UI",
        description: `Before we released Tolgee V1, we wanted to clean up the UI since we wanted 
        our users to have a great user experience.`,
        done: true,
      },
      {
        name: "Automatic screenshot generation",
        description: `Context is the most important thing for translators to do their job correctly. 
We wanted to enable software developers to provide the context to translators
without wasting their time. With Tolgee JS SDK and Tolgee Chrome plugin, 
developers are able to generate screenshots automatically while creating the 
key in the in-context translation UI.`,
        done: true,
      },
    ],
  },
} as Record<string, PeriodData>;

const passedPeriods = Object.entries(roadmapData)
  .filter((i) => !i[1].active && !i[1].future)
  .reduce((acc, [name, data]) => ({ ...acc, [name]: data }), {}) as Record<
  string,
  PeriodData
>;

const activePeriods = Object.entries(roadmapData)
  .filter((i) => i[1].active)
  .reduce((acc, [name, data]) => ({ ...acc, [name]: data }), {}) as Record<
  string,
  PeriodData
>;

const futurePeriods = Object.entries(roadmapData)
  .filter((i) => i[1].future)
  .reduce((acc, [name, data]) => ({ ...acc, [name]: data }), {}) as Record<
  string,
  PeriodData
>;

export default () => {
  return (
    <div className="dark-mode-disabled">
      <Layout title={`Roadmap`}>
        <div className="container roadmap__container">
          <h1 className="roadmap__title">Tolgee Roadmap</h1>
          <div className="roadmap__items-wrapper">
            {[activePeriods, futurePeriods, passedPeriods].map((periods) =>
              Object.entries(periods).map(([period, data]) => (
                <section className="roadmap-period__section">
                  {periods == passedPeriods && (
                    <h2 className="roadmap-period__passed-divider">
                      What have we done so far...
                    </h2>
                  )}
                  <h2 className="roadmap-period__title">{period}</h2>
                  <div className={`roadmap-period__items`}>
                    {data.items.map((item) => (
                      <div
                        className={`roadmap-item ${
                          item.done ? "roadmap-item--done" : ""
                        }`}
                      >
                        <h3>{item.name}</h3>
                        {(typeof item.description === "string"
                          ? [item.description]
                          : item.description
                        ).map((d, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: d }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};
