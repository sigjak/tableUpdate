<template>
  <div>
    <nav class="navbar is-info bg">
      <div class="navbar-brand">
        <div class="navbar-item" style="font-weight:bold;font-size:2rem;">
          IES
        </div>
        <a class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Instruments</a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="getData('probeuse', 'Microprobe')"
                >Microprobe</a
              >
              <a class="navbar-item" @click="getData('ftir', 'FTIR')">FTIR</a>
              <a
                class="navbar-item"
                @click="getData('thin_sections', 'Thin Sections')"
                >Thin Sections</a
              >
              <a class="navbar-item" @click="getData('sem', 'SEM')">SEM</a>
              <hr class="navbar-divider" />
              <a
                class="navbar-item"
                @click="getData('massaes', 'Mass Spec AES')"
                >Mass Spec AES</a
              >
              <a class="navbar-item" @click="getData('ic1000', 'IC 1000')"
                >IC 1000</a
              >
              <a class="navbar-item" @click="getData('ic2000', 'IC 2000')"
                >IC 2000</a
              >
              <a class="navbar-item" @click="getData('icpms', 'ICP MS')"
                >ICP MS</a
              >
              <a class="navbar-item" @click="getData('icpoes', 'ICP OES')"
                >ICP OES</a
              >

              <a class="navbar-item" @click="getData('icpoes2', 'ICP OES II')"
                >ICP OES II</a
              >
              <a class="navbar-item" @click="getData('mcicpms', 'MCICP MS')"
                >MC ICP MS</a
              >
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Vehicles</a>

            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                @click="getData('blue_hilux', 'Blue Hilux')"
                >Blue Hilux</a
              >
              <a class="navbar-item" @click="getData('red_hilux', 'Red Hilux')"
                >Red Hilux</a
              >
              <a
                class="navbar-item"
                @click="getData('opentrailer', 'Open Trailer')"
                >Open Trailer</a
              >
              <a
                class="navbar-item"
                @click="getData('closedtrailer', 'Closed Trailer')"
                >Closed Trailer</a
              >

              <a
                class="navbar-item"
                @click="getData('smalltrailer', 'Small Trailer')"
                >Small Trailer</a
              >
              <hr class="navbar-divider" />
              <a class="navbar-item" @click="getData('viking_a', 'Viking A')"
                >Viking A</a
              >
              <a class="navbar-item" @click="getData('viking_b', 'Viking B')"
                >Viking B</a
              >
              <a class="navbar-item" @click="getData('warrior', 'Warrior ')"
                >Warrior</a
              >
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Houses</a>

            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                @click="getData('helluhraun', 'Helluhraun')"
                >Helluhraun</a
              >
              <a class="navbar-item" @click="getData('dyngja', 'Dyngja')"
                >Dyngja</a
              >
              <a class="navbar-item" @click="getData('vidimelur', 'Víðimelur')"
                >Víðimelur</a
              >
              <hr class="navbar-divider" />
              <a
                class="navbar-item"
                @click="getData('gasdetect', 'Gas Detectors')"
                >Gas Detectors</a
              >
              <a class="navbar-item" @click="getData('firstaid', 'First Aid')"
                >First Aid</a
              >
              <a
                class="navbar-item"
                @click="getData('iridium', 'Iridium Phones')"
                >Iridium Phones</a
              >
            </div>
          </div>
          <a class="navbar-item" @click="getYearData('All Years')">all years</a>
          <a class="navbar-item" @click="getYearData(lastYear)">
            {{ lastYear }}
          </a>
          <a class="navbar-item" @click="getYearData(currentYear)">
            {{ currentYear }}
          </a>

          <span class="navbar-item">
            <span>input year: &nbsp;</span>
            <input
              class="has-text-centered"
              type="text"
              id="inpYr"
              style="width:40px;margin-left:.5em;"
            />
          </span>

          <a class="navbar-item">
            <span style="margin-left:-15px;" @click="getYearData('inpYr')">
              <font-awesome-icon icon="hand-point-right" />&nbsp;Go
            </span>
          </a>
        </div>
        <div class="navbar-end">
          <a href="https://microprobe.hi.is/selectItem" class="navbar-item"
            >To Booking</a
          >
          <a href="http://jardvis.hi.is" class="navbar-item">Exit</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <div
        class="tableName has-text-white has-text-centered is-size-2 has-text-weight-bold"
      >
        {{ this.unitName }}
        {{ this.yearSelected }}
      </div>
      <p class="has-text-white has-text-centered is-size-4">
        Click on column headers to filter content
      </p>
      <vue-good-table
        @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="rows"
        max-height="800px"
        :select-options="{ enabled: true }"
        :search-options="{ enabled: true }"
        styleClass="vgt-table"
        :pagination-options="{
          enabled: true,
          mode: 'pages',
          perPage: 10
        }"
      >
        <div slot="selected-row-actions">
          <button
            v-if="confirm"
            class="button dl is-success is-small"
            @click="confirming"
          >
            Confirm
          </button>
          <button class="button is-warning is-small" @click="openModal">
            Update Selected
          </button>
          <button @click="sweetDelete" class="dl button is-danger is-small">
            Delete Selected
          </button>
          <button @click="sweetName" class="button is-info is-small">
            Download selected
          </button>
        </div>
      </vue-good-table>
    </div>

    <!--------------------------------------- M O D  A  L ------------------- -->
    <div class="modal" id="updateModal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Update {{ unitName }}
          </p>
          <button @click="closeModal" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <form id="updateForm">
            <div v-for="(item, index) in updateArray" :key="index">
              <div class="box modalBox">
                <div class="field is-grouped">
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

                    <!--end houses -->

                    <div v-if="semFtir">
                      <div class="field is-grouped">
                        <div class="control">
                          <label class="cbox checkbox">
                            <input
                              v-model="updateArray[index].am"
                              type="checkbox"
                            />
                            AM
                          </label>
                        </div>

                        <div class="control">
                          <label class="cbox checkbox">
                            <input
                              v-model="updateArray[index].pm"
                              type="checkbox"
                            />
                            PM
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- end ampm -->
                    <div v-if="misc">
                      <div class="field">
                        <div class="label">#Units</div>
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
                    <!-- end misc -->
                  </div>
                </div>
                <!--- end horizontal -->
              </div>
              <!-- end box  -->
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            @click.prevent="update"
            type="submit"
            class="button is-success"
          >
            Update
          </button>
          <button @click="closeModal" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tables',
  props: ['table', 'unit'],
  data() {
    return {
      outfile: '',
      updateArray: [],
      yearSelected: '',
      selected: [],
      tablename: this.table,
      unitName: this.unit,
      columns: [],
      mainColumns: [
        {
          label: 'Name',
          field: 'fullName',
          type: 'string',
          width: '20%'
        },
        {
          label: 'Status',
          field: 'status',
          type: 'string',
          width: '5%',
          tdClass: 'has-text-centered',
          thClass: 'has-text-centered',
          sortable: false
        },
        {
          label: 'Email',
          field: 'email',
          type: 'string',
          width: '10%',
          thClass: 'has-text-centered'
        },
        {
          label: 'Account',
          field: 'account',
          type: 'string',
          width: '10%',
          thClass: 'has-text-centered'
        },
        {
          label: 'Date',
          field: 'date',
          type: 'date',
          dateInputFormat: 'd-M-yyyy',
          dateOutputFormat: 'd-M-yyyy',
          width: '10%',
          height: '10%',
          thClass: 'has-text-centered',
          tdClass: 'has-text-centered'
        },
        {
          label: 'Supervisor',
          field: 'supervisor',
          type: 'string',
          width: '20%'
        },
        {
          label: 'Comments',
          field: 'comments',
          type: 'string',
          width: '25%',
          tdClass: 'commScroll'
        }
      ],
      rows: [],
      thinColumns: [
        {
          label: '27mm Slide',
          field: 'slide27',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: '27mm Coated',
          field: 'slide27coated',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: '1"round polished',
          field: 'oneround',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: '1"round coated',
          field: 'onepolished',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: '1"plug coated',
          field: 'mountcoated',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: '1"plug 7-smps',
          field: 'oneseven',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: 'Carb coating',
          field: 'carbon',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        },
        {
          label: 'Re polishing',
          field: 'repolish',
          type: 'string',
          width: '60px',
          thClass: 'tsheaderClass',
          sortable: false
        }
      ]
    }
  },
  created() {
    if (!this.unitName) {
      this.yearSelected = localStorage.getItem('currentYear')
      this.unitName = localStorage.getItem('unitName')
      this.tablename = localStorage.getItem('tablename')
    } else {
      this.yearSelected = this.currentYear
      localStorage.setItem('currentYear', this.currentYear)
      localStorage.setItem('unitName', this.unitName)
      localStorage.setItem('tablename', this.tablename)
    }
    this.getData(this.tablename, this.unitName)
  },
  computed: {
    currentYear: () => {
      return new Date().getFullYear()
    },
    lastYear: () => {
      return new Date().getFullYear() - 1
    },
    misc: function() {
      if (
        this.unitName === 'First Aid' ||
        this.unitName === 'Gas Detectors' ||
        this.unitName === 'Iridium Phones'
      )
        return true
      return false
    },
    houses: function() {
      if (
        this.unitName === 'Helluhraun' ||
        this.unitName === 'Dyngja' ||
        this.unitName === 'Víðimelur'
      )
        return true
      return false
    },
    semFtir: function() {
      if (this.unitName === 'SEM' || this.unitName === 'FTIR') return true
      return false
    },
    confirm: function() {
      if (this.unitName === 'Red Hilux' || this.unitName === 'Blue Hilux')
        return true
      return false
    }
  },
  methods: {
    openModal() {
      document.getElementById('updateModal').classList.add('is-active')
      this.updateArray = []

      for (let i = 0; i < this.selected.length; i++) {
        let temp = {
          id: this.selected[i]['id'],
          name: this.selected[i]['fullName'],
          date: this.selected[i]['date'],
          status: this.selected[i]['status'],
          am: this.selected[i]['am'],
          pm: this.selected[i]['pm'],
          table: this.tablename
        }
        this.updateArray.push(temp)
      }
    },
    closeModal() {
      document.getElementById('updateModal').classList.remove('is-active')
    },
    update() {
      let error = false

      for (let i = 0; i < this.updateArray.length; i++) {
        const found = this.rows.findIndex(item => {
          return item.id == this.updateArray[i].id
        })

        this.rows[found].fullName = this.updateArray[i].name
        this.rows[found].date = this.updateArray[i].date
        this.rows[found].status = this.updateArray[i].status
        if (this.updateArray[i].am == true && this.updateArray[i].pm == false) {
          this.updateArray[i].status = 0
          this.rows[found].status = 'AM'
        }
        if (this.updateArray[i].am == true && this.updateArray[i].pm == true) {
          this.updateArray[i].status = 1
          this.rows[found].status = 'AM-PM'
        }
        if (this.updateArray[i].am == false && this.updateArray[i].pm == true) {
          this.updateArray[i].status = 2
          this.rows[found].status = 'PM'
        }

        if (this.updateArray[i].am == false && this.updateArray[i].pm == false)
          error = true
      }

      if (!error) {
        this.$http
          .post('update.php', this.updateArray)
          .then(this.sweetUpdated())
        this.closeModal()
      } else {
        this.$swal({
          title: 'Check AM or PM or both',
          type: 'error'
        })
      }
    },
    getYearData(year) {
      this.yearSelected = year
      if (year === 'inpYr') {
        this.yearSelected = document.getElementById('inpYr').value
      }
      this.getData(this.tablename, this.unitName)
    },
    getData(table, unitName) {
      this.rows = []
      this.unitName = unitName
      this.tablename = table
      this.$http
        .get('getTables.php', {
          params: {
            name: table
          }
        })
        .then(response => {
          if (this.yearSelected === 'All Years') {
            this.rows = response.data[0]
            this.manipTables()
          } else {
            for (let i = 0; i < response.data[0].length; i++) {
              let temp = response.data[0][i]['date']
              if (temp.endsWith(this.yearSelected)) {
                this.rows.push(response.data[0][i])
              }
            }
            if (this.tablename === 'thin_sections') {
              this.columns = this.mainColumns.concat(this.thinColumns)
            } else {
              this.columns = this.mainColumns
            }
            this.manipTables()
          }
        })
    },
    manipTables() {
      if (!this.houses) {
        this.$set(this.columns[1], 'hidden', true)
      } else {
        this.$set(this.columns[1], 'hidden', false)
        this.$set(this.columns[1], 'label', 'Guests')
      }
      if (this.semFtir) {
        this.$set(this.columns[1], 'hidden', false)
        this.$set(this.columns[1], 'label', 'AM:PM')

        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].status == '0') {
            this.rows[i].status = 'AM'
            this.rows[i].am = true
            this.rows[i].pm = false
          }
          if (this.rows[i].status == '1') {
            this.rows[i].status = 'AM-PM'
            this.rows[i].am = true
            this.rows[i].pm = true
          }
          if (this.rows[i].status == '2') {
            this.rows[i].status = 'PM'
            this.rows[i].am = false
            this.rows[i].pm = true
          }
        }
      }
      if (this.misc) {
        this.$set(this.columns[1], 'hidden', false)
        this.$set(this.columns[1], 'label', '#Units')
      }
      if (this.confirm) {
        this.$set(this.columns[1], 'hidden', false)
        this.$set(this.columns[1], 'label', 'Confirmed')

        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].status == '0') {
            this.rows[i].status = 'No'
          } else {
            this.rows[i].status = 'Yes'
          }
        }
      }
    },
    dlete() {
      let deleteArray = []
      for (let i = 0; i < this.selected.length; i++) {
        deleteArray.push(this.selected[i]['id'])
      }

      this.rows = this.rows.filter(item => {
        return !deleteArray.includes(item.id)
      })

      this.$http
        .post('delete.php', {
          idArray: deleteArray,
          table: this.tablename
        })
        .then(() => {
          this.sweetDeleted()
        })
    },
    dload() {
      for (let i = 0; i < this.selected.length; i++) {
        delete this.selected[i].reservedate
        delete this.selected[i].vgtSelected
        delete this.selected[i].originalIndex
        delete this.selected[i].vgt_id
        delete this.selected[i].id
        delete this.selected[i].am
        delete this.selected[i].pm
      }

      let outBook = this.$xlsx.utils.book_new()
      let outArray = this.$xlsx.utils.json_to_sheet(this.selected)
      this.$xlsx.utils.book_append_sheet(outBook, outArray, 'output')
      this.$xlsx.writeFile(outBook, this.outfile)
    },
    confirming() {
      let confirmedArray = []

      for (let i = 0; i < this.selected.length; i++) {
        let obj = {
          id: this.selected[i].id,
          name: this.selected[i].fullName,
          email: this.selected[i].email,
          account: this.selected[i].account,
          days: this.selected[i].date,
          comments: this.selected[i].comments,
          tablename: this.tablename,
          unit: this.unitName
        }
        const found = this.rows.findIndex(item => {
          return item.id == this.selected[i].id
        })
        this.rows[found].status = 'Yes'
        confirmedArray.push(obj)
      }

      this.$http
        .post('carConfirm.php', confirmedArray)
        .then(this.sweetConfirmed())
    },
    selectionChanged(params) {
      this.selected = params.selectedRows.slice()
    },
    sweetConfirmed() {
      this.$swal({
        title: 'Confirmed',
        text: 'Email sent',
        type: 'success',
        timer: 1500
      })
    },
    sweetDelete() {
      this.$swal({
        title: 'This can not be undone !',
        type: 'warning',
        showCancelButton: true
      }).then(data => {
        if (data.value) {
          this.dlete()
        }
      })
    },
    sweetUpdated() {
      this.$swal({
        title: 'Updated',
        type: 'success',
        timer: 1500
      })
    },
    sweetDeleted() {
      this.$swal({
        title: 'Deleted',
        type: 'success',
        timer: 1500
      })
    },
    sweetName() {
      this.$swal({
        title: 'Input file name',
        type: 'info',
        input: 'text',
        inputValue: '',
        showCancelButton: true
      }).then(data => {
        if (data.value) {
          this.outfile = data.value + '.xlsx'
          this.dload()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.commScroll {
  display: block;
  max-height: 60px !important;
  overflow: auto;
}
.tsheaderClass {
  font-size: 10px;
}

.dateInp {
  margin: 0em 0.5em 0 1em;
}
.cbox {
  margin-top: 2.25em;
}
.modalBox {
  margin-bottom: 0.5em;
}
.container {
  min-height: 800px;

  padding-bottom: 4em;
}
.vgt-selection-info-row {
  height: 50px;
  padding-top: 10px !important;
}
.dl {
  margin: 0 10px 0 10px;
  width: 120px;
}
.bg {
  margin-top: -7px;

  margin-bottom: 2rem;
}
</style>
