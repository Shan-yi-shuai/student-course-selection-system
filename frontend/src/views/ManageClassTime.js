import { time_to_int, int_to_time } from "@/util/util";
import domain from "../util/domain.js"

export default {
    name: "manage-class-time",
    components: {},
    mounted: function() {
        this.getAllTime()
    },
    data() {
        return {
            start1: "00:00",
            end1: "00:00",
            start2: "00:00",
            end2: "00:00",
            start3: "00:00",
            end3: "00:00",
            start4: "00:00",
            end4: "00:00",
            start5: "00:00",
            end5: "00:00",
            start6: "00:00",
            end6: "00:00",
            start7: "00:00",
            end7: "00:00",
            start8: "00:00",
            end8: "00:00",
            start9: "00:00",
            end9: "00:00",
            start10: "00:00",
            end10: "00:00",
            start11: "00:00",
            end11: "00:00",
            start12: "08:00",
            end12: "00:00",
            start13: "00:00",
            end13: "00:00",
            error: ""
        }
    },
    methods: {
        getAllTime() {
            let _this = this
            _this.$http.get(domain.get_classtime)
                .then((res) => {
                    // console.log(res)

                    let get_time = res.data.data[0];
                    this.start1 = int_to_time(get_time.start1);
                    this.start2 = int_to_time(get_time.start2);
                    this.start3 = int_to_time(get_time.start3);
                    this.start4 = int_to_time(get_time.start4);
                    this.start5 = int_to_time(get_time.start5);
                    this.start6 = int_to_time(get_time.start6);
                    this.start7 = int_to_time(get_time.start7);
                    this.start8 = int_to_time(get_time.start8);
                    this.start9 = int_to_time(get_time.start9);
                    this.start10 = int_to_time(get_time.start10);
                    this.start11 = int_to_time(get_time.start11);
                    this.start12 = int_to_time(get_time.start12);
                    this.start13 = int_to_time(get_time.start13);
                    this.end1 = int_to_time(get_time.end1);
                    this.end2 = int_to_time(get_time.end2);
                    this.end3 = int_to_time(get_time.end3);
                    this.end4 = int_to_time(get_time.end4);
                    this.end5 = int_to_time(get_time.end5);
                    this.end6 = int_to_time(get_time.end6);
                    this.end7 = int_to_time(get_time.end7);
                    this.end8 = int_to_time(get_time.end8);
                    this.end9 = int_to_time(get_time.end9);
                    this.end10 = int_to_time(get_time.end10);
                    this.end11 = int_to_time(get_time.end11);
                    this.end12 = int_to_time(get_time.end12);
                    this.end13 = int_to_time(get_time.end13);

                })
        },
        checkTime(submit_time) {
            if (submit_time.start1 - submit_time.end1 === -45 &&
                submit_time.start2 - submit_time.end2 === -45 &&
                submit_time.start3 - submit_time.end3 === -45 &&
                submit_time.start4 - submit_time.end4 === -45 &&
                submit_time.start5 - submit_time.end5 === -45 &&
                submit_time.start6 - submit_time.end6 === -45 &&
                submit_time.start7 - submit_time.end7 === -45 &&
                submit_time.start8 - submit_time.end8 === -45 &&
                submit_time.start9 - submit_time.end9 === -45 &&
                submit_time.start10 - submit_time.end10 === -45 &&
                submit_time.start11 - submit_time.end11 === -45 &&
                submit_time.start12 - submit_time.end12 === -45 &&
                submit_time.start13 - submit_time.end13 === -45
            ) {
                this.error = "";
            } else {
                this.error = "class duration fault"
                return
            }

            if (submit_time.start2 - submit_time.start1 <= 45 ||
                submit_time.start3 - submit_time.start2 <= 45 ||
                submit_time.start4 - submit_time.start3 <= 45 ||
                submit_time.start5 - submit_time.start4 <= 45 ||
                submit_time.start6 - submit_time.start5 <= 45 ||
                submit_time.start7 - submit_time.start6 <= 45 ||
                submit_time.start8 - submit_time.start7 <= 45 ||
                submit_time.start9 - submit_time.start8 <= 45 ||
                submit_time.start10 - submit_time.start9 <= 45 ||
                submit_time.start11 - submit_time.start10 <= 45 ||
                submit_time.start12 - submit_time.start11 <= 45 ||
                submit_time.start13 - submit_time.start12 <= 45
            ) {
                this.error = "interval fault"
            } else {
                this.error = "";
            }
        },
        submitChange() {
            // console.log(this.$data)

            let submit_time = {
                start1: time_to_int(this.start1),
                start2: time_to_int(this.start2),
                start3: time_to_int(this.start3),
                start4: time_to_int(this.start4),
                start5: time_to_int(this.start5),
                start6: time_to_int(this.start6),
                start7: time_to_int(this.start7),
                start8: time_to_int(this.start8),
                start9: time_to_int(this.start9),
                start10: time_to_int(this.start10),
                start11: time_to_int(this.start11),
                start12: time_to_int(this.start12),
                start13: time_to_int(this.start13),
                end1: time_to_int(this.end1),
                end2: time_to_int(this.end2),
                end3: time_to_int(this.end3),
                end4: time_to_int(this.end4),
                end5: time_to_int(this.end5),
                end6: time_to_int(this.end6),
                end7: time_to_int(this.end7),
                end8: time_to_int(this.end8),
                end9: time_to_int(this.end9),
                end10: time_to_int(this.end10),
                end11: time_to_int(this.end11),
                end12: time_to_int(this.end12),
                end13: time_to_int(this.end13),
            }

            this.checkTime(submit_time)
            // console.log(this.error)

            let _this = this
            _this.$http.post(domain.classtime_change, submit_time, {})
                .then((res) => {
                    // console.log(res)

                    let new_time = res.data.data // ? res.data
                    this.start1 = int_to_time(new_time.start1)
                    this.start2 = int_to_time(new_time.start2)
                    this.start3 = int_to_time(new_time.start3)
                    this.start4 = int_to_time(new_time.start4)
                    this.start5 = int_to_time(new_time.start5)
                    this.start6 = int_to_time(new_time.start6)
                    this.start7 = int_to_time(new_time.start7)
                    this.start8 = int_to_time(new_time.start8)
                    this.start9 = int_to_time(new_time.start9)
                    this.start10 = int_to_time(new_time.start10)
                    this.start11 = int_to_time(new_time.start11)
                    this.start12 = int_to_time(new_time.start12)
                    this.start13 = int_to_time(new_time.start13)
                })
        },
        submitClassTime() {}
    }
}