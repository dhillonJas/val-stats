const INTEGER = "integer"
const DATE = "date"
const STRING = "string"
const PRIZE = "prize"
const LINK = "link"
export const columns_information = {
    Event:{
        Info:{
            "ID":               { value:"event_id",             type:INTEGER },
            "Name":             { value:"event_name",           type:STRING },
            "Offical Title":    { value:"event_title",          type:STRING },
            "Year":             { value:"event_year",           type:INTEGER },
            "Location":         { value:"event_location",       type:STRING },
            "Prize (USD)":      { value:"event_prize_pool",     type:PRIZE },
            "Total Teams":      { value:"event_total_teams",    type:INTEGER },
            "Start Date":       { value:"event_start_date",     type:DATE },
            "End Date":         { value:"event_end_date",       type:DATE },
            "Event Link":       { value:"event_vlr_link",       type:LINK}
        },
        Advanced: {
            "Total Kills":      { value:"total_kills",          type:INTEGER }
        }
    },

    Player:{
        Info:{
            "Name":             { value:"player_name",          type:STRING },
            "Team":             { value:"player_team",          type:STRING },
            "Kills":            { value:"player_both_kills",    type:INTEGER }
        }
    }
}