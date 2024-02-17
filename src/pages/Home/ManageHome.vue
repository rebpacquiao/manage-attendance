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
        <datePicker />
      </div>
      <div class="filter-section">
        <FilterComponent />
      </div>
      <div class="cta-left-section">
        <NFlex vertical>
          <NButton size="large" class="search-left-button w-100" type="success">
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
          <strong>March 01, 2022 - March 16, 2022</strong>
        </div>
        <AttendanceLogs />
      </NFlex>
    </div>
    <div class="exported-section" v-else>
      <ExportedFiles />
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageHome",
};
</script>
<script setup>
import AttendanceLogs from "@/pages/AttendanceLogs/AttendanceLogs.vue";
import ExportedFiles from "@/pages/ExportedFiles/ExportedFiles.vue";
import datePicker from "@/components/DatePicker/DatePicker.vue";
import FilterComponent from "@/components/Filters/Filters.vue";
import CalendarClock from "vue-material-design-icons/CalendarClock.vue";
import DownloadNetworkOutline from "vue-material-design-icons/DownloadNetworkOutline.vue";
import { ref } from "vue";
import { NFlex, NButton } from "naive-ui";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";

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
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./ManageHome.scss";
</style>
