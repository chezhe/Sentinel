package com.sentinel;

import com.facebook.react.ReactActivity;
import com.airbnb.android.react.maps.MapsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnfs.RNFSPackage;
import com.sh3rawi.RNAudioPlayer.RNAudioPlayer;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Sentinel";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new MapsPackage(),
            new RNSpinkitPackage(),
            new RNSoundPackage(),
            new RNFSPackage(),
            new RNAudioPlayer(),
            new ImagePickerPackage(),
            new VectorIconsPackage()
        );
    }
}
