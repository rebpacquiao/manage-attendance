<template>
  <div class="attendance-container">
    <div class="attendance-left-section">
      <div class="top-left-section">
        <h2>{{ leftTitle }}</h2>
        <p>
          {{ isDecription }}
        </p>
        <div class="left-nav">
          <button
            class="left-nav-item"
            @click="initAttendanceLogs"
            :class="activeAttendance"
          >
            <CalendarClock class="default-left-icon-color green-color" />
            {{ attendanceLogsLabel }}
          </button>
          <button
            class="left-nav-item"
            :class="activeExported"
            @click="initExportedLogs"
          >
            <DownloadNetworkOutline
              class="default-left-icon-color green-color"
            />
            {{ exportedLabel }}
          </button>
        </div>
      </div>
      <div class="mid-left-section">
        <div class="filter-heading">
          <h5>Date Range</h5>
        </div>
        <NFlex vertical>
          <div class="filter-items">
            <label>Date From</label>
            <NDatePicker
              v-model="dateFrom"
              @update:value="handleDateFrom"
              type="date"
              size="large"
              format="MM/dd/yyyy"
              placeholder="Select date"
            />
          </div>
          <div class="filter-items">
            <label>Date To</label>
            <NDatePicker
              v-model="dateTo"
              @update:value="handleDateTo"
              type="date"
              size="large"
              format="MM/dd/yyyy"
              placeholder="Select date"
            />
          </div>
        </NFlex>
      </div>
      <div class="filter-section">
        <div class="filter-heading">
          <h5>Filters</h5>
          <NButton quaternary round type="info">Show all</NButton>
        </div>
        <NSpace vertical>
          <div
            v-for="(filter, index) in filters"
            :key="index"
            class="filter-items"
          >
            <label>{{ filter.label }}</label>
            <NSelect
              clearable
              :v-model:value="filter.model"
              :placeholder="filter.placeholder"
              :options="filter.options"
              size="large"
              :multiple="filter.multiple"
              @change="handleSelectChange"
            />
          </div>
        </NSpace>
      </div>
      <div class="cta-left-section">
        <NFlex vertical>
          <NButton
            size="large"
            @click="initSearch"
            class="search-left-button w-100"
            type="success"
          >
            <MagnifyIcon /> {{ searchLabel }}
          </NButton>
          <NButton size="large" class="w-100" disabled>
            <DownloadNetworkOutline /> {{ exportedLabel }}
          </NButton>
        </NFlex>
      </div>
    </div>
    <div class="data-table-section" v-if="isActiveContent">
      <NFlex vertical>
        <div class="calendar-container">
          <CalendarClock class="calendar-icon" />
          <strong v-if="isDate">{{ showDateFrom }} - {{ showDateTo }}</strong>
        </div>
        <NDataTable
          :columns="columns"
          :data="filteredData"
          :pagination="pagination"
        />
      </NFlex>
    </div>
    <div class="exported-section" v-else>
      <ExportedFiles />
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceLogs",
};
</script>

<script setup>
import { NDataTable, NSelect, NSpace, NDatePicker } from "naive-ui";
import { h, reactive, computed, watchEffect } from "vue";
import ExportedFiles from "@/pages/ExportedFiles/ExportedFiles.vue";
import CalendarClock from "vue-material-design-icons/CalendarClock.vue";
import DownloadNetworkOutline from "vue-material-design-icons/DownloadNetworkOutline.vue";
import { ref } from "vue";
import { NFlex, NButton } from "naive-ui";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import { companyData } from "@/data/companyData.js";
import { deparmentData } from "@/data/departmentData.js";
import { locationsData } from "@/data/locationData.js";
import { Employee } from "@/data/employee.js";
import store from "@/store";

const activeAttendance = ref("success");
const activeExported = ref(String);
const isActiveContent = ref(true);
const leftTitle = ref("Manage Attendance");
const attendanceLogsLabel = ref("Attendance Logs");
const isDecription = ref(
  " Attendance management is where you can generate, add edit, and export the logs of the Employees."
);
const exportedLabel = ref("Exported Files");
const searchLabel = ref("Search");
const isDate = ref(false);
const isDateFrom = ref(null);
const isDateTo = ref(null);

const showDateFrom = ref(null);
const showDateTo = ref(null);

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

const filters = ref([
  {
    label: "Company",
    model: "selectedCompany",
    placeholder: "Select company",
    options: companyData,
    multiple: false,
  },
  {
    label: "Department",
    model: "selectedDeparment",
    placeholder: "Select department",
    options: deparmentData,
    multiple: false,
  },
  {
    label: "Location",
    model: "selectedLocation",
    placeholder: "Select location",
    options: locationsData,
    multiple: false,
  },
  {
    label: "Employee",
    model: "selectedEmployee",
    placeholder: "Select employee",
    multiple: true,
    options: Employee.map((employee) => ({
      label: `${employee.firstName} ${employee.lastName}`,
      value: `${employee.firstName} ${employee.lastName}`,
    })),
  },
]);

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

const initAttendanceLogs = () => {
  isActiveContent.value = true;
  activeAttendance.value = "success";
  activeExported.value = "";
};

const initExportedLogs = () => {
  isActiveContent.value = false;
  activeAttendance.value = "";
  activeExported.value = "success";
};

const handleSelectChange = (selectedValue) => {
  console.log(`Selected value for `, selectedValue);
};

const handleDateFrom = (date) => {
  isDateFrom.value = dateFormat(date);
};

const handleDateTo = (date) => {
  isDateTo.value = dateFormat(date);
};

const dateFormat = (rawValue) => {
  const date = new Date(rawValue);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object");
    return;
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};

const dataTableDateFormat = (rawValue) => {
  const date = new Date(rawValue);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object");
    return;
  }

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};

const initSearch = () => {
  showDateFrom.value = dataTableDateFormat(isDateFrom.value);
  showDateTo.value = dataTableDateFormat(isDateTo.value);
  isDate.value = true;
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./AttendanceLogs.scss";
</style>
