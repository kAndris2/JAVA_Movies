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
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.*;

public class ImageService {
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
        String path = "\\src\\main\\resources\\pics",
                uploadPath = System.getProperty("user.dir") + path;

        if (Files.notExists(Path.of(uploadPath))) {
            Files.createDirectory(Path.of(uploadPath));
        }

        String filename = createUniqueFilename() + file.getName().split(".")[1],
                filePath = uploadPath + filename;

        file.transferTo(
                new File(filePath)
        );

        idao.getPictures().add(
                ids.createImage(filePath, userId)
        );
    }

    String createUniqueFilename() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        char[] chars = characters.toCharArray();
        String unique = "";
        int length = 20;
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            unique += chars[random.nextInt(chars.length)];
        }
        return unique;
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
        ImageInputStream is = ImageIO.createImageInputStream(file);
        Iterator iter = ImageIO.getImageReaders(is);

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