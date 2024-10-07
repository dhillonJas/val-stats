export const INTEGER = "integer"
export const DATE = "date"
export const STRING = "string"
export const PRIZE = "prize"
export const LINK = "link"
export const LIST = "list"
export const OBJECT = "object"
export const ROUND_SIDES = "round_sides"
export const STAT_SIDES = "stat_sides"

export const INFORMATION = "Information"
export const ADVANCED = "Advanced"
export const events_columns = {
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
    
}

export const teams_columns = {
    Information:{
        "Name" :            { value:"name",              type:STRING },
        "Region":           { value:"region",            type:STRING },
        "Events Attended":  { value:"events_attended",   type:LIST },
        "Events Won":       { value:"events_won",        type:STRING },
        "Best Placement":   { value:"events_best_placements",type:STRING },
        "Maps Won" :        { value:"maps_won",          type:INTEGER },
        "Maps Lost" :       { value:"maps_lost",         type:INTEGER },
        "Map Picks Won" :   { value:"map_picks_won",     type:INTEGER },
        "Map Picks Lost" :  { value:"map_picks_lost",    type:INTEGER },
        "Rounds Won" :      { value:"rounds_won",        type:ROUND_SIDES },
        "Rounds Lost" :     { value:"rounds_lost",       type:ROUND_SIDES },
        // "Rounds Lost" :      { value:"matches_won",      type:ROUND_SIDES },
        // "Rounds Lost" :      { value:"matches_lost",      type:ROUND_SIDES },

    },
    Advanced:{
        "Name" :            { value:"name",              type:STRING },
        "Region":           { value:"region",            type:STRING },
        "Kills" :           { value:"kills",             type:STAT_SIDES },
        "Deaths" :          { value:"deaths",            type:STAT_SIDES },
        "Assists" :         { value:"assists",           type:STAT_SIDES },
        "Kill-Death Diff" : { value:"diffs",             type:STAT_SIDES },
        "First Kills" :     { value:"first_kills",       type:STAT_SIDES },
        "First Deaths" :    { value:"first_deaths",      type:STAT_SIDES },
        "Aces" :            { value:"Aces",              type:INTEGER },
        "2K" :              { value:"2k",                type:INTEGER },
        "3K" :              { value:"3k",                type:INTEGER },
        "4K" :              { value:"4k",                type:INTEGER },
        "1v1" :             { value:"1v1",               type:INTEGER },
        "1v2" :             { value:"1v2",               type:INTEGER },
        "1v3" :             { value:"1v3",               type:INTEGER },
        "1v4" :             { value:"1v4",               type:INTEGER },
        "1v5" :             { value:"1v5",               type:INTEGER }
    }
    
}

export const player_columns = {
    Information:{
        "Name":             { value:"player_name",          type:STRING },
        "Team":             { value:"player_team",          type:STRING },
        "Kills":            { value:"player_both_kills",    type:INTEGER }
    },
    Advanced:{
        "Deaths":           { value:"player_both_deaths",    type:INTEGER }
    }
}