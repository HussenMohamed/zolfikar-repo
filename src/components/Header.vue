<template>

    <div class="header">
      <div class="logo">
        <router-link to="/"><h1>Logo</h1></router-link>
      </div>

      <div class="navs">
        <!-- Theme Toggler -->
        <div class="theme-toggler">
          <span class="icon">
            <!-- <i class='bx bx-sun' name="sun"></i> -->
            <i class='bx bx-moon' name="moon"></i>
          </span>
        </div>

        <RouterLink to="/login">login</RouterLink>
        <RouterLink to="">Logout</RouterLink>
        <RouterLink to="/">play video</RouterLink>
        <RouterLink to="/user/1">user Profile</RouterLink>
      </div>

      
    </div>
    
</template>

<style>
.header{
  padding: 0 50px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--box-shadow);
  position: absolute;
  width: 100%;
  font-size: 18px;
}
.header .navs a:not(:last-child){
  margin: 0 10px;
}
.header .navs .theme-toggler{display: inline;}
</style>