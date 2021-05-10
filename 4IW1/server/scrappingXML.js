const { Scrapper, CSVGenerator } = require("./scrapper");

new Scrapper(
  {
    url: "https://www.myges.fr/teacher/planning-calendar",
    method: "POST",
    headers: {
      Accept: "application/xml",
      Cookie:
        "__utmz=175984062.1590479394.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID=FBD6310DBB4E135328AE2F1FA2818F09; __utma=175984062.38601653.1590479394.1620135289.1620671666.108; __utmc=175984062; __utmt=1; __utmb=175984062.2.10.1620671666' \
      --data-raw 'javax.faces.partial.ajax=true&javax.faces.source=calendar%3Amyschedule&javax.faces.partial.execute=calendar%3Amyschedule&javax.faces.partial.render=calendar%3Amyschedule&calendar%3Amyschedule=calendar%3Amyschedule&calendar%3Amyschedule_start=1620597600000&calendar%3Amyschedule_end=1621202400000&calendar=calendar&calendar%3AfilterPlanning=date&calendar%3AselectedDate_input=10%2F05%2F21&calendar%3Amyschedule_view=agendaWeek&javax.faces.ViewState=1191228323697401499%3A4812163350471741931",
    },
    body:
      "javax.faces.partial.ajax=true&javax.faces.source=calendar%3Amyschedule&javax.faces.partial.execute=calendar%3Amyschedule&javax.faces.partial.render=calendar%3Amyschedule&calendar%3Amyschedule=calendar%3Amyschedule&calendar%3Amyschedule_start=1620597600000&calendar%3Amyschedule_end=1621202400000&calendar=calendar&calendar%3AfilterPlanning=date&calendar%3AselectedDate_input=10%2F05%2F21&calendar%3Amyschedule_view=agendaWeek&javax.faces.ViewState=1191228323697401499%3A4812163350471741931",
  },
  (data) => console.log(data.querySelectorAll("update").length) || [],
  (data) => CSVGenerator(data, "./planning.csv")
).scrap();
