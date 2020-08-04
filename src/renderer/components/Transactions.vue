<template>
  <div>
    <div class="flex justify-between items-end mb-4">
      <div>
        <div class="flex font-bold items-center text-xl pb-1">
          Today's orders
          <span class="font-normal text-xs text-gray-600 ml-1">
            ({{ currentTime }})
          </span>
          <span
            v-if="new_reservation"
            class="bg-orange-100 font-bold ml-4 px-4 py-1 rounded-full text-orange-600 text-xs"
          >
            New Reservation
          </span>
        </div>
        <div class="flex font-medium items-center text-md text-pink-500">
          (If status is
          <span
            class="bg-green-100 font-bold ml-1 px-4 py-1 rounded-full text-green-600 text-xs"
          >
            new
          </span>
          , you may serve.)
        </div>
      </div>
      <div
        class="flex flex-col space-y-2 md:space-y-0 space-x-0 md:flex-row md:space-x-2"
      >
        <button class="btn" @click="alarmTest">Alarm Test</button>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="bg-white rounded p-4 shadow gray-800 space-y-4"
      >
        <div class="flex items-center">
          <span class="text-gray-600">Status:</span>
          <span
            v-if="transaction.status !== 'succeeded'"
            class="bg-red-100 font-bold ml-2 px-4 py-1 rounded-full text-red-600 text-xs"
          >
            {{ transaction.status }}
          </span>
          <span
            v-else-if="isNew(transaction.created_at)"
            class="bg-green-100 font-bold ml-2 px-4 py-1 rounded-full text-green-600 text-xs"
          >
            new
          </span>
          <span
            v-else
            class="bg-gray-400 font-bold ml-2 px-4 py-1 rounded-full text-gray-800 text-xs"
          >
            served
          </span>
        </div>
        <div>
          <span class="text-gray-600">Order number:</span>
          {{ transaction.id }}
        </div>
        <div>
          <span class="text-gray-600">Name:</span>
          {{ transaction.name }}
        </div>
        <div>
          <span class="text-gray-600">Phone:</span>
          {{ transaction.phone }}
        </div>
        <div v-if="transaction.takeout_time">
          <span class="text-gray-600">Takeout time:</span>
          {{ transaction.takeout_time }}
        </div>
        <div v-if="transaction.address">
          <span class="text-gray-600">Address:</span>
          {{ transaction.address }}
        </div>
        <div>
          <span class="text-gray-600">Total:</span>
          $ {{ transaction.total }}
        </div>
        <div>
          <span class="text-gray-600">Created at:</span>
          {{ transaction.created_at }}
        </div>
        <div v-if="transaction.message">
          <span class="text-gray-600">Message:</span>
          {{ transaction.message }}
        </div>
        <div><span class="text-gray-600">Items:</span></div>
        <div class="space-y-3">
          <div
            v-for="(item, key) in transaction.items"
            :key="'item' + key"
            class="space-y-1"
          >
            <div>{{ item.name }}</div>
            <div class="text-gray-600 text-sm">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <audio
      id="alarm"
      src="../assets/sound/jingle-bells-sms.ogg"
      preload="auto"
    />
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      new_order: null,
      new_reservation: null,
      update_interval: null,
      timeoutId: null,
      transactions: {}
    };
  },
  computed: {
    currentTime() {
      return moment().format("hh:mm a");
    }
  },
  mounted() {
    this.getTransactions();

    this.timeoutId = setTimeout(() => {
      location.reload();
    }, 10000);
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  methods: {
    alarmTest() {
      document.getElementById("alarm").play();
    },
    getTransactions() {
      this.$http
        .get("https://www.matsusushionhunter.com/api/transactions", {
          params: {
            api_key: process.env.MATSUSUSHI_KEY
          }
        })
        .then(response => {
          this.transactions = response.data.transactions;
          this.new_reservation = response.data.new_reservation;
          this.update_interval = response.data.update_interval;

          if (response.data.new_order) {
            document.getElementById("alarm").play();
          }
        });
    },
    isNew(createdAt) {
      if (
        moment(createdAt, "YYYY-MM-DD hh:mm a").isAfter(
          moment().subtract(1, "hours")
        )
      ) {
        return true;
      }
    }
  }
};
</script>