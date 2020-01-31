<template>
  <div class="container">
    <h1 class="db title is-1 has-text-centered has-text-white">Databases</h1>
    <div class="inner">
      <div class="box">
        <form>
          <div class="field">
            <p class="control">
              <label class="label">Login</label>
              <input
                class="input"
                v-model="loginData.login"
                type="text"
                placeholder="admin"
              />
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <p class="control">
              <input
                v-model="loginData.password"
                type="password"
                class="input"
                placeholder="admin password"
              />
            </p>
          </div>

          <button type="submit" class="button" @click.prevent="submitted">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adminUsers: [],

      loginData: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    showLoginError() {
      this.$swal({
        title: 'Oops',
        type: 'error',
        text: 'Wrong login!',
        timer: 2000
      })
    },
    submitted() {
      this.$http.get('getUsers.php').then(response => {
        this.adminUsers = response.data
        if (
          this.adminUsers.includes(this.loginData.login) &&
          this.loginData.password === 'askja'
        ) {
          this.$router.push({
            name: 'tables',
            params: { table: 'probeuse', unit: 'Microprobe' }
          })
        } else {
          this.showLoginError()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.db {
  margin-top: 1em;
}
.inner {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner .box {
  width: 300px;
  margin-top: -10em;
}
</style>
