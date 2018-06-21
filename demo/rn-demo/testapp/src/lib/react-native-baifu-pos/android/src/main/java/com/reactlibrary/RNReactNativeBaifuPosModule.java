
package com.reactlibrary;

import android.widget.Toast;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.uimanager.IllegalViewOperationException;

public class RNReactNativeBaifuPosModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNReactNativeBaifuPosModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNReactNativeBaifuPos";
  }

  @ReactMethod
  public void printMsg(String message) {
    Toast.makeText(this.reactContext, message, Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void getPrintStatus(Callback successCallback, Callback errorCallback) {
    try {
      successCallback.invoke("JS回调获得该信息");
    } catch (IllegalViewOperationException e) {
      errorCallback.invoke(e.getMessage());
    }
  }
}