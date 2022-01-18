import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { TextField } from '@material-ui/core'
import Form from './../../useForm';
import controls from './../../Controls/controls';

export default function UsersForm() {
    
    return (
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <controls.Input label="First name"></controls.Input>

            <controls.Input label="Last name"></controls.Input>

            <controls.Input label="email"></controls.Input>

            <controls.Input label="password"></controls.Input>
          </Grid>
          <Grid item xs={6}>
            <controls.Checkbox label="isTeacher" />

            <div>
              <controls.Button type="submit" text="Submit" />
              <controls.Button
                text="Reset"
                color="default"
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    );
}
