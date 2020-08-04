<template>
  <div id="app" class="min-h-screen antialiased text-gray-900 bg-gray-200 p-8">
    <transactions></transactions>
  </div>
</template>

<script>
import Transactions from "@/components/Transactions";

export default {
  name: "matsusushi",
  components: {
    Transactions
  }
};
</script>
