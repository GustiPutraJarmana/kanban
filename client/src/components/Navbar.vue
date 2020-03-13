<!-- @format -->
<template>
  <div class="topmenu">
    <div class="container">
      <div class="logout text-right">
         <h2 class="text-center">KangBum Board</h2>
        <button v-on:click="$emit('logoutButton')" class="btn btn-danger text-right" style="margin-top:-35Px; border-radius: 20px;">LOGOUT</button>
      </div>
      <!-- **** logout **** -->
    </div>
    <!-- *** search ***** -->
  </div>
</template>
