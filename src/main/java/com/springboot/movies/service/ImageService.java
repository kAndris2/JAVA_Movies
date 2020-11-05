package com.springboot.movies.service;

import com.springboot.movies.database.IDAO;
import com.springboot.movies.dataservice.ImageDataService;
import com.springboot.movies.model.ImageModel;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.*;

public class ImageService {
    final String PATH = "\\app\\public\\pics\\";
    IDAO idao = IDAO.getInstance();

    ImageDataService ids = new ImageDataService(idao);

    public ImageService() throws SQLException {
    }

    public ImageModel getProfileImage(Integer userId) throws IllegalAccessException {
        List<ImageModel> images = getImages(userId);

        if (images.size() >= 1)
            return images.get(images.size() - 1);
        return null;
    }

    public List<ImageModel> getImages(Integer userId) {
        List<ImageModel> images = new ArrayList<>();

        for (ImageModel image : idao.getPictures()) {
            if (userId.equals(image.getUserId()))
                images.add(image);
        }
        return images;
    }

    public void uploadImage(MultipartFile file, Integer userId) throws IOException {
        String uploadPath = System.getProperty("user.dir") + PATH,
                extension = "." + file.getContentType().split("/")[1];

        if (Files.notExists(Path.of(uploadPath))) {
            Files.createDirectory(Path.of(uploadPath));
        }

        String filename = createUniqueFilename(uploadPath, extension), //+ file.getName().split(".")[1],
                filePath = uploadPath + filename + extension;

        file.transferTo(
                new File(filePath)
        );

        idao.getPictures().add(
                ids.createImage(
                        filename + extension,
                        userId
                )
        );
    }

    String createUniqueFilename(String path, String ext) {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        char[] chars = characters.toCharArray();
        int length = 20;
        String unique = "";
        List<String> imgNames = getNames();
        Random random = new Random();

        do {
            unique = "";

            for (int i = 0; i < length; i++) {
                unique += chars[random.nextInt(chars.length)];
            }
        }
        while (imgNames.contains(path + unique + ext));
        return unique;
    }

    List<String> getNames() {
        List<String> names = new ArrayList();

        for (ImageModel img : idao.getPictures()) {
            names.add(img.getRoute());
        }
        return names;
    }

    public void deleteImage(Integer iid) throws SQLException {
        for (ImageModel image : idao.getPictures()) {
            if (iid.equals(image.getId())) {
                ids.removeImageFromDb(image.getId());
                idao.getPictures().remove(image);
                break;
            }
        }
    }

    public void resetImages(Integer uid) throws SQLException {
        ids.resetImages(uid);
        for (ImageModel image : idao.getPictures()) {
            if (uid.equals(image.getUserId()))
                idao.getPictures().remove(image);
        }
    }

    public String getDominantColor(MultipartFile file) throws IOException {
        File filex = new File(PATH + "temp");

        try (OutputStream os = new FileOutputStream(filex)) {
            os.write(file.getBytes());
        }

        ImageInputStream is = ImageIO.createImageInputStream(filex);
        Iterator iter = ImageIO.getImageReaders(is);

        if (!iter.hasNext())
        {
            System.out.println("Cannot load the specified file "+ filex);
            System.exit(1);
        }

        ImageReader imageReader = (ImageReader)iter.next();
        imageReader.setInput(is);

        BufferedImage image = imageReader.read(0);

        int height = image.getHeight();
        int width = image.getWidth();

        Map m = new HashMap();
        for(int i=0; i < width ; i++)
        {
            for(int j=0; j < height ; j++)
            {
                int rgb = image.getRGB(i, j);
                int[] rgbArr = getRGBArr(rgb);
                // Filter out grays....
                if (!isGray(rgbArr)) {
                    Integer counter = (Integer) m.get(rgb);
                    if (counter == null)
                        counter = 0;
                    counter++;
                    m.put(rgb, counter);
                }
            }
        }
        filex.delete();
        return getMostCommonColour(m);
    }

    String getMostCommonColour(Map map) {
        List list = new LinkedList(map.entrySet());
        Collections.sort(list, new Comparator() {
            public int compare(Object o1, Object o2) {
                return ((Comparable) ((Map.Entry) (o1)).getValue())
                        .compareTo(((Map.Entry) (o2)).getValue());
            }
        });
        Map.Entry me = (Map.Entry )list.get(list.size()-1);
        int[] rgb= getRGBArr((Integer)me.getKey());
        return Integer.toHexString(rgb[0])+" "+Integer.toHexString(rgb[1])+" "+Integer.toHexString(rgb[2]);
    }

    int[] getRGBArr(int pixel) {
        int alpha = (pixel >> 24) & 0xff;
        int red = (pixel >> 16) & 0xff;
        int green = (pixel >> 8) & 0xff;
        int blue = (pixel) & 0xff;
        return new int[]{red,green,blue};

    }
    boolean isGray(int[] rgbArr) {
        int rgDiff = rgbArr[0] - rgbArr[1];
        int rbDiff = rgbArr[0] - rgbArr[2];
        // Filter out black, white and grays...... (tolerance within 10 pixels)
        int tolerance = 10;
        if (rgDiff > tolerance || rgDiff < -tolerance)
            if (rbDiff > tolerance || rbDiff < -tolerance) {
                return false;
            }
        return true;
    }
}
