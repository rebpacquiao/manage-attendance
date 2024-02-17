<template>
  <NFlex vertical>
    <div
      v-for="filterItem in filterItems"
      :key="filterItem.label"
      :class="filterItem.class"
    >
      <label>{{ filterItem.label }}</label>
      <NSelect
        v-model:value="filterItem.model"
        size="large"
        :placeholder="filterItem.placeholder"
        :options="filterItem.options"
      />
    </div>
  </NFlex>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import { NSelect, NFlex } from "naive-ui";
import { companyData } from "@/data/companyData.js";
import { deparmentData } from "@/data/departmentData.js";
import { locationsData } from "@/data/locationData.js";
import { Employee } from "@/data/employee.js";

export default defineComponent({
  name: "FilterComponent",
  components: {
    NSelect,
    NFlex,
  },
  data() {
    return {
      filterItems: [
        {
          label: "Company",
          class: "filter-items",
          model: "selectedCompany",
          placeholder: "Select company",
          options: companyData,
        },
        {
          label: "Department",
          class: "filter-items",
          model: "selectedDepartment",
          placeholder: "Select department",
          options: deparmentData,
        },
        {
          label: "Location",
          class: "filter-items",
          model: "selectedLocation",
          placeholder: "Select location",
          options: locationsData,
        },
        {
          label: "Employee",
          class: "filter-items",
          model: "selectedEmployee",
          placeholder: "Select Employee",
          options: Employee.map((employee) => ({
            label: `${employee.firstName} ${employee.lastName}`,
            value: employee,
          })),
        },
      ],
    };
  },
  computed: {
    employeeOptions() {
      return Employee.map((employee) => ({
        label: `${employee.firstName} ${employee.lastName}`,
        value: `${employee.firstName} ${employee.lastName}`,
      }));
    },
  },
  setup() {
    return {
      companyData,
      deparmentData,
      locationsData,
      Employee,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
