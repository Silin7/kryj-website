<script setup lang="ts">

</script>

<template>
  <div class="gtFlex">
    <div class="gtBox">
      <img src="../assets/sys/gotop.png" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gtFlex {
  position: fixed;
  z-index: 999;
  right: 2rem;
  bottom: 5rem;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    right: 0.5rem;
    bottom: 2rem;
  }

  .gtBox {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebf0fb;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 4rem;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>