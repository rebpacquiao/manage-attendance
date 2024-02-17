<template>
  <n-data-table
    :columns="columns"
    :data="filteredData"
    :pagination="pagination"
  />
</template>

<script>
export default {
  name: "AttendanceLogs",
};
</script>

<script setup>
import { NDataTable } from "naive-ui";
import { h, reactive, computed, watchEffect } from "vue";
import store from "@/store";

const columns = [
  {
    title: "Name",
    key: "name",
    render(row) {
      return h("span", row.firstName + " " + row.lastName);
    },
  },
  {
    title: "Date",
    key: "date",
  },
  {
    title: "Time",
    key: "time",
  },
  {
    title: "In/Out",
    key: "inOut",
  },
  {
    title: "Log Details",
    key: "logDetails",
  },
  {
    title: "Location",
    key: "location",
  },
  {
    title: "Project Name",
    key: "projectName",
  },
];

const pagination = reactive({
  pageSize: 15,
  page: 1,
  showSizePicker: true,
  pageSizes: [5, 10, 25, 50],
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.page = 1;
    pagination.pageSize = pageSize;
  },
});

const filteredData = computed(() => {
  return store.getters.getFilteredData;
});

watchEffect(() => {
  pagination.total = filteredData.value.length;
});
</script>
