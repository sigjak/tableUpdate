<template>
  <div class="container">
    <h1 class="is-size-2 has-text-centered has-text-white">Update</h1>
    <p class="mb has-text-centered has-text-white is-size-4">{{ unitName }}</p>
    <!-- <button class="button" @click="sab">sab</button>  -->
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form>
          <div v-for="(item, index) in updateArray" :key="index">
            <div class="box">
              <div class="field is horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="label">Name</div>
                    <div class="control">
                      <input
                        class="input has-text-centered"
                        type="text"
                        v-model="updateArray[index]['name']"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="label">Date</div>
                    <div class="control">
                      <input
                        class="input has-text-centered"
                        type="text"
                        v-model="updateArray[index]['date']"
                      />
                    </div>
                  </div>
                  <div v-if="houses">
                    <div class="field">
                      <div class="label">Guests</div>
                      <div class="control">
                        <input
                          class="input has-text-centered"
                          type="text"
                          v-model="updateArray[index]['status']"
                          style="width:50px;"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="button is-link is-primary"
            type="submit"
            @click.prevent="update"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['passing', 'unitName', 'tablename'],
  computed: {
    updateArray: function() {
      let temp = []
      let dd = JSON.parse(this.passing)
      for (let i = 0; i < dd.length; i++) {
        temp.push({
          id: dd[i]['id'],
          name: dd[i]['fullName'],
          date: dd[i]['date'],
          status: dd[i]['status'],
          table: this.tablename
        })
      }

      return temp
    },
    houses: function() {
      if (
        this.unitName === 'Helluhraun' ||
        this.unitName === 'Dyngja' ||
        this.unitName === 'Vidimelur'
      )
        return true
      return false
    }
  },
  methods: {
    update() {
      this.$http.post('update.php', this.updateArray).then(response => {
        console.log(response)
        this.$router.push({
          name: 'tables',
          params: { table: this.tablename, unit: this.unitName }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.mb {
  margin-bottom: 10px;
}
.box {
  margin-bottom: 10px;
}
</style>
