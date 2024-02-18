import { h } from "vue";
import { NText, NButton } from "naive-ui";
import SquareEditOutline from "vue-material-design-icons/SquareEditOutline.vue";
export const columns = [
  {
    title: "Name",
    key: "name",
    sorter: "default",
    render(row) {
      return h("div", [
        h("span", row.firstName),
        h("span", { class: "last-name" }, row.lastName),
        h("span", { class: "employee-id" }, row.employeeId),
      ]);
    },
  },
  {
    title: "Date",
    key: "date",
    sorter: "default",
  },
  {
    title: "Time",
    key: "time",
  },
  {
    title: "In/Out",
    key: "inOut",
    sorter: "default",
    render(row) {
      let inOutColor = "info";
      row.inOut === "In" ? (inOutColor = "info") : (inOutColor = "warning");
      return h(NText, { type: inOutColor, strong: true }, row.inOut);
    },
  },
  {
    title: "Log Details",
    key: "logDetails",
    sorter: "default",
    render(row) {
      return h(
        NButton,
        { type: "default", strong: true, primary: true },
        row.logDetails
      );
    },
  },
  {
    title: "Location",
    key: "location",
    sorter: "default",
  },
  {
    title: "Project Name",
    key: "projectName",
    sorter: "default",
  },
  {
    title: "Action",
    key: "action",
    render() {
      return h(NButton, { type: "warning", quaternary: true }, () =>
        h(SquareEditOutline)
      );
    },
  },
];
