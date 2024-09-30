const INTEGER = "integer"
const DATE = "date"
const STRING = "string"
const PRIZE = "prize"
const LINK = "link"
const LIST = "list"
const OBJECT = "object"
export const columns_information = {
    Event:{
        Information:{
            "Name":             { value:"event_name",           type:STRING },
            "Winner":           { value:"event_winner_name",    type:STRING },
            "Winning Region":   { value:"event_winner_region",  type:STRING },
            "Winning Country":  { value:"event_winner_country", type:STRING },
            "Year":             { value:"event_year",           type:INTEGER },
            "Location":         { value:"event_location",       type:STRING },
            "Prize Pool (USD)": { value:"event_prize",          type:PRIZE },
            "Total Teams":      { value:"event_total_teams",    type:INTEGER },
            "Start Date":       { value:"event_start_date",     type:DATE },
            "End Date":         { value:"event_end_date",       type:DATE },
            "All Teams":        { value:"event_all_teams",      type:LIST },
            "Teams Placements": { value:"event_team_placements",type:OBJECT},
            "Event Link":       { value:"event_link",           type:LINK}
        },
        Advanced: {
            "Name":                  { value:"event_name",          type:STRING },
            "Total Matches Played":  { value:"event_matches_played",type:STRING },
            "Total Maps Played":     { value:"event_maps_played",   type:STRING },
            "Total Kills":           { value:"event_kills",         type:INTEGER },
            "Total Deaths":          { value:"event_deaths",        type:INTEGER },
            "Total Assists":         { value:"event_assists",       type:INTEGER },
            "Total +/-":             { value:"event_diffs",         type:INTEGER },
            "Total Attack Kills":    { value:"event_t_kills",       type:INTEGER },
            "Total Attack Deaths":   { value:"event_t_deaths",      type:INTEGER },
            "Total Attack Assists":  { value:"event_t_assists",     type:INTEGER },
            "Total Attack +/-":      { value:"event_t_diffs",       type:INTEGER },
            "Total Defense Kills":   { value:"event_ct_kills",      type:INTEGER },
            "Total Defense Deaths":  { value:"event_ct_deaths",     type:INTEGER },
            "Total Defense Assists": { value:"event_ct_assists",    type:INTEGER },
            "Total Defense +/-":     { value:"event_ct_diffs",      type:INTEGER },
            "Aces":                  { value:"event_5k",            type:INTEGER },
            "2Ks":                   { value:"event_2k",            type:INTEGER },
            "3Ks":                   { value:"event_3k",            type:INTEGER },
            "4Ks":                   { value:"event_4k",            type:INTEGER },
            "1v1s":                  { value:"event_1v1",           type:INTEGER },
            "1v2s":                  { value:"event_1v2",           type:INTEGER },
            "1v3s":                  { value:"event_1v3",           type:INTEGER },
            "1v4s":                  { value:"event_1v4",           type:INTEGER },
            "1v5s":                  { value:"event_1v5",           type:INTEGER },
        }
    },

    Player:{
        Information:{
            "Name":             { value:"player_name",          type:STRING },
            "Team":             { value:"player_team",          type:STRING },
            "Kills":            { value:"player_both_kills",    type:INTEGER }
        },
        Advanced:{
            "Deaths":           { value:"player_both_deaths",    type:INTEGER }
        }
    }
}