package com.myawesomeapp;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MyAwesomeApp";
  }

//   @Override
//   public void onActivityResult(int requestCode, int resultCode, Intent data) {
//       super.onActivityResult(requestCode, resultCode, data);
//       LocationSwitch.getInstance().onActivityResult(requestCode, resultCode);
//   }
}
