<template>
  <div class="main-contaner">
    <NLayout>
      <NLayoutHeader>
        <div class="announcement-container">
          <div class="announcment-left">
            <h2>Announcements</h2>
            <p>
              View, create, or edit announcements for all employees of your
              company.
            </p>
          </div>
          <div class="announcment-right">
            <a href="/" class="announcement-link">Manage Attendance</a>
          </div>
        </div>
      </NLayoutHeader>
      <NLayoutContent class="announcement-data-table">
        <div class="announcement-filter">
          <div class="announcement-left"></div>
          <div class="announcement-search">
            <NInput
              v-model:value="searchAnnouncement"
              type="text"
              placeholder="Search"
              @input="handleSearch"
            />
          </div>
        </div>
        <NDataTable
          :columns="columns"
          :data="filteredLetters"
          :pagination="pagination"
        />
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<script>
export default {
  name: "PostAnnouncements",
};
</script>
<script setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NDataTable,
  NInput,
} from "naive-ui";
import { h, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const searchAnnouncement = ref("");

const columns = [
  {
    title: "Title",
    key: "title",
    sorter: "default",
  },
  {
    title: "Message",
    key: "message",
    sorter: "default",
    render(row) {
      return h("div", { class: "ellipse-container" }, [
        h("span", { class: "col-message" }, row.message),
      ]);
    },
  },
  {
    title: "Sent By",
    key: "sentBy",
    sorter: "default",
  },
  {
    title: "Date Created",
    key: "dateCreated",
    sorter: "default",
  },
  {
    title: "Start Date",
    key: "startDate",
    sorter: "default",
  },
  {
    title: "End Date",
    key: "endDate",
    sorter: "default",
  },
];

const pagination = reactive({
  pageSize: 10,
  page: 1,
  showSizePicker: true,
  pageSizes: [5, 10],
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.page = 1;
    pagination.pageSize = pageSize;
  },
});

const filteredLetters = computed(() => {
  return store.state.announcements.filter((announcement) => {
    return announcement.title
      .toLowerCase()
      .includes(searchAnnouncement.value.toLowerCase());
  });
});

const handleSearch = () => {
  store.dispatch("updateFilteredData", searchAnnouncement.value);
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./PostAnnouncements.scss";
</style>
