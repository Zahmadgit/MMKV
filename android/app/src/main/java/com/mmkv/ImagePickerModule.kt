package com.mmkv

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ImagePickerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private var pickerPromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String {
        return "ImagePickerModule"
    }

    @ReactMethod
    fun openPicker(promise: Promise) {
        val activity: Activity = currentActivity ?: run {
            promise.reject("ACTIVITY_NOT_FOUND", "Activity doesn't exist")
            return
        }

        pickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
            activity.startActivityForResult(galleryIntent, IMAGE_PICKER_REQUEST)
        } catch (e: Exception) {
            pickerPromise?.reject("ERROR_OPENING_GALLERY", e.message)
            pickerPromise = null
        }
    }

    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == IMAGE_PICKER_REQUEST) {
            if (pickerPromise != null) {
                if (resultCode == Activity.RESULT_OK) {
                    val uri: Uri? = data?.data
                    pickerPromise?.resolve(uri.toString())
                } else {
                    pickerPromise?.reject("PICKER_CANCELLED", "Image picker was cancelled")
                }
                pickerPromise = null
            }
        }
    }

    override fun onNewIntent(intent: Intent?) {
        // Not required for this module
    }

    companion object {
        private const val IMAGE_PICKER_REQUEST = 467081
    }
}
