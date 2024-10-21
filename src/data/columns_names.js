export const INTEGER = "integer"
export const DATE = "date"
export const STRING = "string"
export const PRIZE = "prize"
export const LINK = "link"
export const LIST = "list"
export const OBJECT = "object"
export const ROUND_SIDES = "round_sides"
export const STAT_SIDES = "stat_sides"
export const STRING_LIST = "string_list"
export const PLACEMENT = "placement"


export const BASIC = "Basic"
export const ADVANCED = "Advanced"
export const events_columns = {
    Basic:{
        "Event":            { value:"event_name",           type:STRING },
        "Winner":           { value:"event_winner_name",    type:STRING },
        "Winning Region":   { value:"event_winner_region",  type:STRING },
        "Winning Country":  { value:"event_winner_country", type:STRING },
        "Year":             { value:"event_year",           type:INTEGER },
        "Location":         { value:"event_location",       type:STRING },
        "Prize Pool (USD)": { value:"event_prize",          type:PRIZE },
        "Total Teams":      { value:"event_total_teams",    type:INTEGER },
        "Start Date":       { value:"event_start_date",     type:DATE },
        "End Date":         { value:"event_end_date",       type:DATE },
        "All Teams":        { value:"event_all_teams",      type:LIST, collapsedType: STRING_LIST,        width: '200px'},
        "Teams Placements": { value:"event_team_placements",type:OBJECT},
        "Event Link":       { value:"event_link",           type:LINK}
    },
    Advanced: {
        "Event":                 { value:"event_name",          type:STRING },
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
    Basic:{
        "Team" :            { value:"name",              type:STRING,        width: '200px' },
        "Region":           { value:"region",            type:STRING,        width: '90px'  },
        "Events Attended":  { value:"events_attended",   type:STRING_LIST,   width: '260px', collapsedType: LIST },
        "Events Won":       { value:"events_won",        type:STRING_LIST,   width: '240px' },
        "Best Placement":   { value:"events_best_placements",type:PLACEMENT, width: '240px', collapsedType: LIST },
        "Maps Won" :        { value:"maps_won",          type:INTEGER },
        "Maps Lost" :       { value:"maps_lost",         type:INTEGER },
        "Map Picks Won" :   { value:"map_picks_won",     type:INTEGER },
        "Map Picks Lost" :  { value:"map_picks_lost",    type:INTEGER },
        "Rounds Won" :      { value:"rounds_won",        type:ROUND_SIDES,   width: '260px' },
        "Rounds Lost" :     { value:"rounds_lost",       type:ROUND_SIDES,   width: '260px' }

    },
    Advanced:{
        "Team" :            { value:"name",              type:STRING },
        "Region":           { value:"region",            type:STRING },
        "Kills" :           { value:"kills",             type:STAT_SIDES, width: '130px' },
        "Deaths" :          { value:"deaths",            type:STAT_SIDES, width: '130px' },
        "Assists" :         { value:"assists",           type:STAT_SIDES, width: '130px' },
        "Kills / Round":    { value:"killsperround",     type:STAT_SIDES, width: '175px' },
        "Deaths / Round":   { value:"deathsperround",    type:STAT_SIDES, width: '175px' },
        "Assists / Round":  { value:"assistsperround",   type:STAT_SIDES, width: '175px' },
        "Kill-Death Diff" : { value:"diffs",             type:STAT_SIDES, width: '130px' },
        "First Kills" :     { value:"first_kills",       type:STAT_SIDES, width: '130px'  },
        "First Deaths" :    { value:"first_deaths",      type:STAT_SIDES, width: '130px'  },
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
    Basic:{
        "Player":           { value:"player_name",    type:STRING, width: '150px' },
        "Team Tag":         { value:"player_team",    type:STRING },
        "All previous teams":{ value:"prev_teams",    type:STRING_LIST, collapsedType: LIST },
        "Maps played":      { value:"maps_played",    type:INTEGER },    
        "Maps won":         { value:"maps_won",       type:INTEGER },    
        "Maps lost":        { value:"maps_lost",      type:INTEGER },    
        "Kills":            { value:"kills",          type:STAT_SIDES, width: '130px' },
        "Deaths":           { value:"deaths",         type:STAT_SIDES, width: '130px' },
        "Assists":          { value:"assists",        type:STAT_SIDES, width: '130px' },
        "Kill Diff":        { value:"diffs",          type:STAT_SIDES, width: '130px' },
        "Kills / Round":    { value:"killsperround",  type:STAT_SIDES, width: '175px' },
        "Deaths / Round":   { value:"deathsperround", type:STAT_SIDES, width: '175px' },
        "Assists / Round":  { value:"assistsperround",type:STAT_SIDES, width: '175px' },
        "Average Rating":   { value:"rating",         type:STAT_SIDES, width: '155px' },
        "ADR":              { value:"adr",            type:STAT_SIDES, width: '200px' },
        "ACS":              { value:"acs",            type:STAT_SIDES, width: '200px' },
        "Kill Assists":     { value:"kast",           type:STAT_SIDES, width: '200px' },
        "Headshot %":       { value:"hsp",            type:STAT_SIDES, width: '175px' },
        "First Kills":      { value:"first_kills",    type:STAT_SIDES, width: '130px' },
        "First Deaths":     { value:"first_deaths",   type:STAT_SIDES, width: '130px' },

    },
    Advanced:{
        "Player":           { value:"player_name",  type:STRING, width: '150px' },
        "Team Tag":         { value:"player_team",  type:STRING, width: '70px'  },
        "Aces" :            { value:"Aces",         type:INTEGER, width: '50px' },
        "2K" :              { value:"2k",           type:INTEGER, width: '50px' },
        "3K" :              { value:"3k",           type:INTEGER, width: '50px' },
        "4K" :              { value:"4k",           type:INTEGER, width: '50px' },
        "1v1" :             { value:"1v1",          type:INTEGER, width: '50px' },
        "1v2" :             { value:"1v2",          type:INTEGER, width: '50px' },
        "1v3" :             { value:"1v3",          type:INTEGER, width: '50px' },
        "1v4" :             { value:"1v4",          type:INTEGER, width: '50px' },
        "1v5" :             { value:"1v5",          type:INTEGER, width: '50px' }
    }
}